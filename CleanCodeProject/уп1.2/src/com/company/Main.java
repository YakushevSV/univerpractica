package com.company;

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println("введите номер сответствующий требуtмому пункту меню\n"
                + "1.сохранение сообщений в файл\n"
                + "2.добавление сообщения\n"
                + "3.просмотр истории сообщений в хронологическом порядке\n"
                + "4.удаление сообщения по идентификатору\n"
                + "5.поиск в истории сообщения по автору\n"
                + "6.поиск в истории сообщения по ключевому слову (лексеме целиком)\n"
                + "7.поиск в истории сообщения по регулярному выражению\n"
                + "8.просмотр истории сообщений за определенный период\n"
                + "9.выход\n"
        );
        boolean f = true;
        FileWriter fw;
        try {
            fw = new FileWriter("logfile");
            Chat ch1 = null;
            Scanner sc;
            try {
                ch1 = new Chat("log.txt");
            } catch (IOException e) {
                fw.write(e.getClass().toString() + "\n");
                f = false;
            }
            try{
                sc = new Scanner(System.in);
                while (f) {
                    switch (sc.nextInt()) {
                        case 1:
                            ch1.writeFile("output.txt");
                            System.out.println("сообщения успешно записаны в файл \"output.txt\"");
                            fw.write("сообщения успешно записаны в файл \"output.txt\" \n");
                            break;
                        case 2:
                            System.out.println("введите имя автора и текст сообщения");
                            sc.nextLine();
                            fw.write("добавление сообщения :\n");
                            String s1 = sc.nextLine();
                            String s2 = sc.nextLine();
                            if(s1.length() > 140||s2.length() >140){
                                //System.out.println("строка слишком длинная");
                                fw.write("строка слишком длинная \n");
                            }
                            if (ch1.addMessage(s1, s2)){
                                System.out.println("сообщение успешно добавлено");
                                fw.write("сообщение успешно добавлено \n");
                            } else{
                                System.out.println("добавление не удалось");
                                fw.write("добавление не удалось \n");
                            }
                            break;
                        case 3:
                            fw.write("просмотр истории сообщений в хронологическом порядке \n");
                            ch1.showChronology();
                            break;
                        case 4:
                            System.out.println("введите id удаляемого сообщения");
                            fw.write("удаление сообщения по идентификатору: \n");
                            sc.nextLine();
                            if (ch1.deleteMessage(sc.nextLine())){
                                System.out.println("сообщение успешно удалено");
                                fw.write("сообщение успешно удалено \n");
                            } else {
                                System.out.println("удаление не удалось");
                                fw.write("удаление не удалось \n");
                            }
                            break;
                        case 5:
                            System.out.println("введите имя интересующего вас автора");
                            fw.write("поиск в истории сообщения по автору: \n");
                            sc.nextLine();
                            fw.write("найдено " + ch1.authorSerch(sc.nextLine()) + "\n");
                            break;
                        case 6:
                            System.out.println("введите ключевое слово(лексему целеком ) для поиска");
                            fw.write("поиск в истории сообщения по ключевому слову (лексеме целиком): \n");
                            sc.nextLine();
                            fw.write("найдено " + ch1.keyWordSerch(sc.nextLine()) + "\n");
                            break;
                        case 7:
                            System.out.println("введите регулярное выражение для поиска");
                            fw.write("поиск в истории сообщения по регулярному выражению \n");
                            sc.nextLine();
                            fw.write("найдено " + ch1.regexSerch(sc.nextLine()) + "\n");
                            break;
                        case 8:
                            System.out.println("введите интересующий вас период в формате dd.MM.yyyy , dd.MM.yyyy");
                            fw.write("просмотр истории сообщений за определенный период");
                            sc.nextLine();
                            ch1.periodShow(sc.nextLine(), sc.nextLine());
                            break;
                        case 9:
                            f = false;
                            break;
                        default:
                            break;
                    }
                }
            } catch (Exception e){
                fw.write(e.getClass().toString() + "\n");
            }
            fw.close();
        }

        catch (IOException e) {
            System.err.print("error writing logfile");
        }

    }
}
