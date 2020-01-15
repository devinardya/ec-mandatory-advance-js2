import axios from 'axios'

class RequestHandler {

 constructor(){
  this.cancelToken = axios.CancelToken;
  this.source = this.cancelToken.source();
 }

 get(url,callback){

  axios.get("http://3.120.96.16:3001/movies/",{
   cancelToken:this.source.token,
  }).then(function(response){

        callback(response.data);

    }).catch(function(err){

        console.log(err);

    })

 }

post("http://3.120.96.16:3001/movies/",callbackOnSuccess,callbackOnFail){
 axios.post("http://3.120.96.16:3001/movies/",{

        cancelToken:this.source.token,

    }).then(function(response){

        callbackOnSuccess(response.data);

    }).catch(function(err){

        callbackOnFail()

    })
}

abortAll(){

 this.source.cancel();
    // regenerate cancelToken
 this.source = this.cancelToken.source();

}

}




// cancel the request
export {cancelTok};