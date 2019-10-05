/**
 * Settup Server Sent Event to stream in uptodate mvovie list
 * @param {React.Component} context 
 * @param {String} backend 
 */

const setupSSeGet = (context, backend) => {
    
    if (window.EventSource) {
        let source = new EventSource(backend+'sseUpdate', {withCredentials: true});

        source.addEventListener('message', function(e) {
          console.log(e.data, "List update");
            //context.setState({movies : e.data});
        }, false);

        source.addEventListener('open', function(e) {
            console.log("connected to SSE", e);
        }, false)
      
        source.addEventListener('error', function(e) {
          console.log("Nope, something went wrong");
          console.log(e);
          if (e.readyState === EventSource.CLOSED) {
            console.log("Connection was closed")
          }
        }, false);
    
    }

};

export default setupSSeGet;




