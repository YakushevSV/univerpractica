package chat.chatListner;



import chat.Constants;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(value = "/chat")
public class MainListner extends HttpServlet{

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        String query = req.getQueryString();
        if (query == null) {
//            return Response.badRequest("Absent query in request");
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/homepage.html");
            dispatcher.forward(req,resp);
        }
        if (query.equals("users")) {
//            List<User> users = messageStorage.getUsers();
//            String responseBody = MessageHelper.buildServerResponseBodyUsers(users, messageStorage.userCounter());
//            return Response.ok(responseBody);
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/homepage.html");
            dispatcher.forward(req,resp);
        }
        Map<String, String> map = queryToMap(query);
        String token = map.get(Constants.REQUEST_PARAM_TOKEN);
//        if (StringUtils.isEmpty(token)) {
//            return Response.badRequest("Token query parameter is required");
//        }
//        try {
//            int index = MessageHelper.parseToken(token);
//            if (index > messageStorage.size()) {
//                return Response.badRequest(
//                        String.format("Incorrect token in request: %s. Server does not have so many messages", token));
//            }
//            Portion portion = new Portion(index);
//            List<Message> messages = messageStorage.getPortion(portion);
//            String responseBody = MessageHelper.buildServerResponseBody(messages, messageStorage.size());
//            return Response.ok(responseBody);
//        } catch (InvalidTokenException e) {
//            return Response.badRequest(e.getMessage());
//        }
    }

    private Map<String, String> queryToMap(String query) {
        Map<String, String> result = new HashMap<String, String>();

        for (String queryParam : query.split(Constants.REQUEST_PARAMS_DELIMITER)) {
            String paramKeyValuePair[] = queryParam.split("=");
            if (paramKeyValuePair.length > 1) {
                result.put(paramKeyValuePair[0], paramKeyValuePair[1]);
            } else {
                result.put(paramKeyValuePair[0], "");
            }
        }
        return result;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        String query = req.getQueryString();
//        try {
            if(query!= null&&query.contains("users")){
                Map<String, String> map = queryToMap(query);
                String token = map.get(Constants.REQUEST_PARAM_USER_RESPONCE);
                if(token.equals("add")){
//                    User user = MessageHelper.getNewUser(httpExchange.getRequestBody());
//                    logger.info(String.format("new user : %s", user));
//                    messageStorage.addUser(user);
//                    return Response.ok();
                }else if(token.equals("update")){
//                    User user = MessageHelper.getNewUser(httpExchange.getRequestBody());
//                    logger.info(String.format("user edit profile : %s", user));
//                    messageStorage.updateUser(user);
//                    return Response.ok();
                }

            }
//            Message message = MessageHelper.getClientMessage(httpExchange.getRequestBody());
//            logger.info(String.format("Received new message from user: %s", message));
//            messageStorage.addMessage(message);
//            return Response.ok();
//        } catch (ParseException e) {
//            logger.error("Could not parse message.", e);
//            return new Response(Constants.RESPONSE_CODE_BAD_REQUEST, "Incorrect request body");
//        } catch (IOException e) {
//            e.printStackTrace();
//            return new Response(Constants.RESPONSE_CODE_BAD_REQUEST, "Incorrect request body");
//        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPut(req, resp);

//        try {
//            Message message = MessageHelper.getEditMessage(httpExchange.getRequestBody());
//            //logger.info(String.format("message has been changed));
//            if(messageStorage.updateMessage(message))
//                return Response.ok();
//            return new Response(Constants.RESPONSE_CODE_BAD_REQUEST, "Incorrect request body");
//        } catch (ParseException e) {
//            logger.error("Could not parse message.", e);
//            return new Response(Constants.RESPONSE_CODE_BAD_REQUEST, "Incorrect request body");
//        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doDelete(req, resp);
        String query = req.getQueryString();
        if (query == null) {
//            return Response.badRequest("Absent query in request");
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/homepage.html");
            dispatcher.forward(req,resp);
        }
        Map<String, String> map = queryToMap(query);
        String token = map.get(Constants.REQUEST_PARAM_MESSAGE_ID);
//        if (StringUtils.isEmpty(token)) {
//            return Response.badRequest("Token query parameter is required");
//        }
//        try {
//            Message message = MessageHelper.getDelMessage(httpExchange.getRequestBody());
            String id = token;
//            if(!messageStorage.removeMessage(id)){
//            if(!messageStorage.replaceMessage(id, message)){
//                return Response.badRequest(
//                        String.format("Incorrect token in request: %s. Server does not have message with such id", id));
//            }
//            String responseBody = MessageHelper.buildServerResponseBody(messages, messageStorage.size());
//            return Response.ok();
            //return Response.gone();
//        } catch (InvalidTokenException e) {
//            return Response.badRequest(e.getMessage());
//        }catch (ParseException e) {
//            logger.error("Could not parse message.", e);
//            return new Response(Constants.RESPONSE_CODE_BAD_REQUEST, "Incorrect request body");
//        }

    }
}
