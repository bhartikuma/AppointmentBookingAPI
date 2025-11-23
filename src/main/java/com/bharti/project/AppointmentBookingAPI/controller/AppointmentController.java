package com.bharti.project.AppointmentBookingAPI.controller;

import com.bharti.project.AppointmentBookingAPI.model.Appointment;
import com.bharti.project.AppointmentBookingAPI.repository.AppointmentRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentRepository repo;

    public AppointmentController(AppointmentRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        return repo.save(appointment);
    }

    @GetMapping
    public List<Appointment> getAll() {
        return repo.findAll();
    }

    @GetMapping("/page")
    public Page<Appointment> getPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }

    @PutMapping("/{id}")
    public Appointment update(@PathVariable String id, @RequestBody Appointment appointment) {
        Appointment existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        existing.setName(appointment.getName());
        existing.setPhone(appointment.getPhone());
        existing.setDate(appointment.getDate());
        existing.setTime(appointment.getTime());

        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {

        if (!repo.existsById(id)) {
            throw new RuntimeException("Appointment Not Found!");
        }

        repo.deleteById(id);
        return "Appointment Deleted Successfully!";
    }

    @GetMapping("/search/name/{name}")
    public List<Appointment> searchByName(@PathVariable String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }

    @GetMapping("/search/phone/{phone}")
    public List<Appointment> searchByPhone(@PathVariable String phone) {
        return repo.findByPhone(phone);
    }

    @GetMapping("/search/date/{date}")
    public List<Appointment> searchByDate(@PathVariable String date) {
        return repo.findByDate(date);
    }

    @GetMapping("/search")
    public List<Appointment> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String date
    ) {
        if (name != null) {
            return repo.findByNameContainingIgnoreCase(name);
        } else if (phone != null) {
            return repo.findByPhone(phone);
        } else if (date != null) {
            return repo.findByDate(date);
        } else {
            throw new RuntimeException("Please provide name, phone, or date for search.");
        }
    }
}
