function my_func() {
    let user_date = $('#userInputDate').val();
    let user_key = '2d8e579e31759d1dc24ccba95acb6553';
    let open_api = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'

    $.ajax({
        // async : false,
        url : open_api, 
        type : 'GET', 
        dataType : 'json', 
        data : {            
            key : user_key, 
            targetDt : user_date
        },
        success : function(result) {
            
            $('#mv_tbody').empty() 
            let movie_list = result['boxOfficeResult']['dailyBoxOfficeList'] 
            for(let i = 0; i < movie_list.length; i++) {
                let m_name = movie_list[i].movieNm;
                let m_rank = movie_list[i].rank;
     

                // 가져온 데이터를 HTML Element에 붙여넣기
                // <tr>
                //     <td>순위</td>
                //     <td>영화제목</td>
                //     <td>
                //          <img src=" ">
                //     </td>
                //     <td>
                //          <input type=button value=포스터보기>
                //     </td>
                // </tr>

                let tr = $('<tr></tr>')
                let rank_td = $('<td></td>').text(m_rank);
                let name_td = $('<td></td>').text(m_name);
                let img_td = $('<td></td>')
                let img_img = $('<img />')
                let button_td = $('<td></td>')
                let poster_btn = $('<input />').attr('type', 'button').attr('value', '포스터보기');
                
                // <tr></tr> 삭제
                poster_btn.on('click', function(){

                    // AJAX 방식으로 서버 프로그램을 호출
                    // 호출할 서버프로그램: 다음 카카오의 키워드 검색 프로그램 (이미지 검색)
                    $.ajax({
                        url : 'https://dapi.kakao.com/v2/search/image',
                        type : 'GET',
                        dataType : 'json',
                        data : {
                            query : m_name
                        },
                        headers : {
                            Authorization: 'KakaoAK d0dd4c8e207ec896777133cd05d756ab'
                        },
                        success : function(image) {
                            // alert('호출 성공')
                            console.log(image)
                            let poster_list = image['documents'][5].thumbnail_url;
                            console.log(poster_list)
                            img_td.append(img_img)
                            img_img.attr('src', poster_list);
                            

                        },
                        error : function() {
                            alert('호출 실패')
                        }

                    })
                })
                button_td.append(poster_btn);
                
                $('#mv_tbody').append(tr)
                tr.append(rank_td);
                tr.append(name_td);
                tr.append(img_td);
                tr.append(button_td);


            }
        },
        error : function() {
            alert('서버 호출 실패');
        }
    })

    
}