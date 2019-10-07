
/**
 * Attaches server sent events to response 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function sseUpdate(req, res, next) {
    res.sseSetup = function() {
      res.status(200);
      res.header('Content-Type', 'text/event-stream');
      res.header('Cache-Control', 'no-cache');
      res.header('Connection', 'keep-alive');
      
    }

    res.sseSend = function(data) {
      res.write(JSON.stringify(data)+"\n\n");
      res.flush();
    }
    
    res.sseSendSetup = function(){
      console.log('Attempting to settup sse');
      try{
        res.write("true\n\n");
        res.flush();
      }catch(e){
        console.log(e, "Broke trying to write to settup");
      }
  }
  
    next();
  }

  module.exports = sseUpdate;