package com.bharti.project.AppointmentBookingAPI.repository;

import com.bharti.project.AppointmentBookingAPI.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {

    List<Appointment> findByNameContainingIgnoreCase(String name);
    List<Appointment> findByPhone(String phone);
    List<Appointment> findByDate(String date);

    // Pagination
    Page<Appointment> findAll(Pageable pageable);
}
