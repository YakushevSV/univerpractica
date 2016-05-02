
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Type;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Scanner;

@WebServlet(value = "/login")
public class MainServlet extends HttpServlet{
    private static final String DEFAULT_USERS_STORAGE = "users.txt";
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String login = req.getParameter("user-login");
        String password = req.getParameter("user-password");
        String enter = req.getParameter("enter");
        String register = req.getParameter("register");
        List<User> users = new ArrayList<User>();
        Gson gson = new Gson();
        Type collectionType = new TypeToken<Collection<User>>(){}.getType();

        User testing_user = null;
        try {
            testing_user = new User(login,Hashcode.encryptPassword(password));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        if(register != null){
            try {
                Scanner sc = new Scanner(new File(DEFAULT_USERS_STORAGE));
                if(sc.hasNext()) {
                    StringBuilder sb = new StringBuilder(sc.nextLine());
                    while (sc.hasNextLine()) {
                        sb.append(sc.nextLine());
                    }
                    users = gson.fromJson(sb.toString(),collectionType);
                }
                if(users.contains(testing_user)){
                    resp.sendRedirect(req.getContextPath() + "/login.html");
                    // написать что такой юзер есть
                }else{
                    users.add(testing_user);
                    FileWriter fw = new FileWriter(DEFAULT_USERS_STORAGE);
                    fw.write(gson.toJson(users));
                    fw.close();
                    resp.sendRedirect(req.getContextPath() + "/homepage.html");// добавить передачу логина и пароля пользователя
                }
            } catch (FileNotFoundException e) {
                FileWriter fw = new FileWriter(DEFAULT_USERS_STORAGE);
                fw.write(gson.toJson(testing_user));
                fw.close();
            }
        }else if(enter != null){
            try {
                Scanner sc = new Scanner(new File(DEFAULT_USERS_STORAGE));
                if(sc.hasNext()) {
                    StringBuilder sb = new StringBuilder(sc.nextLine());
                    while (sc.hasNextLine()) {
                        sb.append(sc.nextLine());
                    }
                    users = gson.fromJson(sb.toString(),collectionType);
                }
                if(users.contains(testing_user)){
                    resp.sendRedirect(req.getContextPath() + "/homepage.html");// добавить передачу логина и пароля пользователя
                }else{
                    resp.sendRedirect(req.getContextPath() + "/login.html");
                    // написать что юзера нет
                }
            } catch (FileNotFoundException e) {
                resp.sendRedirect(req.getContextPath() + "/login.html");
               // написать что пользователя нет
            }
        }
    }



}
