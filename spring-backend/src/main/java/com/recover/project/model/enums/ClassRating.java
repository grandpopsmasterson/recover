package com.recover.project.model.enums;

public enum ClassRating {
    CLASS_1(0,5),
    CLASS_2(5,40),
    CLASS_3(40,100);
    private final int minPercentage;
    private final int maxPercentage;

    ClassRating(int minPercentage, int maxPercentage) {
        this.minPercentage = minPercentage;
        this.maxPercentage = maxPercentage;
    }
    public static ClassRating fromPercentage(double damagePercentage) {
        for(ClassRating classRating : values()) {
            if(damagePercentage >= classRating.minPercentage && damagePercentage <= classRating.maxPercentage){
                return classRating;
            }
        }
        throw new IllegalArgumentException("Invalid damage percentage: " + damagePercentage);
    }
}
