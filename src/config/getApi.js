export default function apiCall(url,res,rej){
  let datas = new XMLHttpRequest()
  datas.onreadystatechange = function (){
    if (datas.readyState === 4) {
      if (datas.status === 200) {
        res(datas.response)
      }else{
        rej()
      }
    }
  }
  datas.open('get',url)
  datas.send()
}
