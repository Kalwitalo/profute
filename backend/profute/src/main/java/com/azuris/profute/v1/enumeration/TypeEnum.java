package com.azuris.profute.v1.enumeration;

public enum TypeEnum {
    ANALYTIC("Analítico"),
    SITUATIONAL("Situacional"),
    INTEGRATED("Integrado");

    public String name;

    TypeEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
