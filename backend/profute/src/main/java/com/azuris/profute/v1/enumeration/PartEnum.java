package com.azuris.profute.v1.enumeration;

public enum PartEnum {
    WARM("Aquecimento"),
    MAIN("Principal"),
    FINAL("Final");

    public String name;

    PartEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
