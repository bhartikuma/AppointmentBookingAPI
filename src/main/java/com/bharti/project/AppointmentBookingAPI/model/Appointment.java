package com.bharti.project.AppointmentBookingAPI.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "appointments")
public class Appointment {

    @Id
    private String id;
    private String name;
    private String phone;
    private String date;
    private String time;
}


