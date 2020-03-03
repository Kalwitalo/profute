package com.azuris.profute.v1.enumeration;

public enum FocusEnum {
    PHYSICAL("Físico"),
    TECHNICAL("Técnico"),
    TACTICAL("Tático"),
    PSYCHOSOCIAL("Psicossocial");

    public String name;

    FocusEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
