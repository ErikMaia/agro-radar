package com.agro.radar.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agro.radar.dto.DispositivoDTO;
import com.agro.radar.models.Dispositivo;
import com.agro.radar.services.DispositivoService;

@RestController
@RequestMapping("/api/dispositivos")
public class DispositivoController {

    @Autowired
    private DispositivoService dispositivoService;

    @GetMapping
    public List<DispositivoDTO> listar() {
        List<Dispositivo> dispositivos = dispositivoService.buscarTodos();
    
        dispositivos.forEach(dispositivo -> {
            dispositivo.getSensores().size(); // Inicializa a coleção sensores
        });
    
        return dispositivos.stream()
                .map(DispositivoDTO::new)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public DispositivoDTO buscarPorId(@PathVariable Long id) {
        Dispositivo dispositivo = dispositivoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));
        return new DispositivoDTO(dispositivo);
    }

    @PostMapping
    public DispositivoDTO criar(@RequestBody Dispositivo dispositivo) {
        Dispositivo novoDispositivo = dispositivoService.salvar(dispositivo);
        return new DispositivoDTO(novoDispositivo);
    }

    @PutMapping("/{id}")
    public DispositivoDTO atualizar(@PathVariable Long id, @RequestBody Dispositivo dispositivoAtualizado) {
        Dispositivo dispositivo = dispositivoService.atualizar(id, dispositivoAtualizado);
        return new DispositivoDTO(dispositivo);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        dispositivoService.deletar(id);
    }
}
