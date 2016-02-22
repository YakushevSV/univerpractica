package com.company;

public class Massage {
    private String id;
    private String author;
    private long timestamp;
    private String message;
    public Massage(String i, String m, String a, long t){
        id =i;
        message = m;
        author = a;
        timestamp = t;
    }

    public String getId() {

        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
