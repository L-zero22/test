
// 简易的ajax请求
function ajax(data){
    let method=data.method || 'get';
    let url = data.url;
    let datas = data.data || null;
    let http = new XMLHttpRequest();
    return new Promise((rsolve,reject)=>{
        http.open(method,url);
        http.send(datas);
        http.onreadystatechange =()=>{
            if(http.readyState === 4){
            if(http.status == 200){
                rsolve.call(undefined,JSON.parse(http.response))
            }else if(http.status == 400){
                reject.call(undefined,http)
            }
        }
        }
    })
}