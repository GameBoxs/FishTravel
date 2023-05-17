package com.carassius.fallenfish.domain.game.dto;

import jdk.jfr.Registered;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Registered
public class MarkerRequest extends PlayerRequest{
    private String name;
    private Double lat;
    private Double lng;
}
