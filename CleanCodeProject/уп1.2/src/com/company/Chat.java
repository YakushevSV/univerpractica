package com.company;

import java.io.*;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * Created by lenovo on 10.02.16.
 */
public class Chat {
    ArrayList<Massage> messages;
    public Chat(String filename) throws Exception{
        Gson gson = new Gson();
        messages = new ArrayList();
        //Reader reader = new InputStreamReader(JsonToJava.class.getResourceAsStream(filename));
        Type collectionType = new TypeToken<Collection<Massage>>(){}.getType();
        Scanner sc = new Scanner(new File(filename));
        StringBuilder sb=new StringBuilder(sc.nextLine());
        while (sc.hasNextLine()){
            sb.append(sc.nextLine());
        }
        messages = gson.fromJson(sb.toString(),collectionType);
    }
    public void writeFile(String filename){
        try {
            FileWriter fw = new FileWriter(filename);
            Gson gson = new Gson();
            fw.write(gson.toJson(messages));
            fw.close();
        } catch (IOException e) {

        }

    }
    public boolean addMessage(String aut, String mes){
        UUID uuid = UUID.randomUUID();
        long curTime = System.currentTimeMillis();
        Massage m = new Massage(uuid.toString(), mes, aut, curTime);
        messages.add(m);
        return true;
    }
    public boolean deleteMessage(String id){
        boolean f1 = false;
        for(Massage m: messages){
            if(m.getId().equals(id)){
                messages.remove(m);
                f1 = true;
                break;
            }
        }
        return f1;
    }
    public void showChronology(){
        Collections.sort(messages,comp);
        for(Massage m: messages){
            System.out.println(m.getAuthor() + " -> \"" + m.getMessage() + "\"");
        }
    }
    Comparator<Massage> comp = new Comparator<Massage>() {
        @Override
        public int compare(Massage o1, Massage o2) {
            if(o1.getTimestamp()>o2.getTimestamp())
                return 1;
            else if(o1.getTimestamp()==o2.getTimestamp())
                return 0;
            else
                return -1;
        }
    };
    public void authorSerch(String aut){// сделать boolean
        for(Massage m: messages){
            if(m.getAuthor().equals(aut)){
                System.out.println(m.getAuthor() + " -> \"" + m.getMessage() + "\"");
            }
        }
    }
    public void keyWordSerch(String key){
        for(Massage m: messages){
            if(m.getMessage().contains(key)){
                System.out.println(m.getAuthor() + " -> \"" + m.getMessage() + "\"");
            }

        }
    }
    public void regexSerch(String regex){
        for(Massage m: messages){
            if (Pattern.matches(regex,m.getMessage())){
                System.out.println(m.getAuthor() + " -> \"" + m.getMessage() + "\"");
            }
        }

    }
    public void periodShow(String s1, String s2){
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
        Date d1;
        Date d2;
        try {
            d1= sdf.parse(s1);
            d2 = sdf.parse(s2);
            long l1 = d1.getTime();
            long l2 = d2.getTime();
            for(Massage m: messages){
                if (l1<=m.getTimestamp()&&l2>=m.getTimestamp()){
                    System.out.println(m.getAuthor() + " -> \"" + m.getMessage() + "\"");
                }
            }

        } catch (ParseException e) {

        }

    }




}
