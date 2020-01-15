import axios from 'axios';



function cancelTok(){
    const CancelToken = axios.CancelToken;
    let cancel;
    
    axios.get('http://3.120.96.16:3001/movies/', {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
           cancel = c;
        })
      });

      
}




// cancel the request
export {cancelTok};