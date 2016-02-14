package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) throws Exception{
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
        Chat ch1 = new Chat("log.txt");
        while (f){
            Scanner sc = new Scanner(System.in);
            switch (sc.nextInt()){
                case 1:
                    ch1.writeFile("output.txt");
                    break;
                case 2:
                    System.out.println("введите имя автора и текст сообщения");
                    sc.nextLine();
                    ch1.addMessage(sc.nextLine(), sc.nextLine());
                    break;
                case 3:
                    ch1.showChronology();
                    break;
                case 4:
                    System.out.println("введите id удаляемого сообщения");
                    sc.nextLine();
                    ch1.deleteMessage(sc.nextLine());
                    break;
                case 5:
                    System.out.println("введите имя интересующего вас автора");
                    sc.nextLine();
                    ch1.authorSerch(sc.nextLine());
                    break;
                case 6:
                    System.out.println("введите ключевое слово(лексему целеком ) для поиска");
                    sc.nextLine();
                    ch1.keyWordSerch(sc.nextLine());
                    break;
                case 7:
                    System.out.println("введите регулярное выражение для поиска");
                    sc.nextLine();
                    ch1.regexSerch(sc.nextLine());
                    break;
                case 8:
                    System.out.println("введите интересующий вас период в формате dd.MM.yyyy , dd.MM.yyyy");
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




    }
}
