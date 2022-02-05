import {auth, database} from "../services/firebase";
import {useEffect, useState} from "react";
import {child, get, ref} from "firebase/database";
import convert from "convert";

export function Calories(age, weight, height, gender) {
    let c1;
    let hm;
    let wm;
    let am;
    let bmrResult;
    if (gender === "male") {
        c1 = 66;
        hm = 6.2 * height;
        wm = 12.7 * weight;
        am = 6.76 * age;
    }
    if (gender === "female") {
        c1 = 655.1;
        hm = 4.35 * height;
        wm = 4.7 * weight;
        am = 4.7 * age;
    }
    bmrResult = c1 + hm + wm - am
    // console.log(age,weight,height,gender)

    return (parseInt(bmrResult));
}

export function CalculateActivity(bmrResult,activityLevel) {
    if (activityLevel === 'none')
        activityLevel = 1.2 * bmrResult
    else if (activityLevel === 'light')
        activityLevel = 1.375 * bmrResult
    else if (activityLevel === 'moderate')
        activityLevel = 1.55 * bmrResult
    else if (activityLevel === 'heavy')
        activityLevel = 1.725 * bmrResult
    return (parseInt(activityLevel));
}

export function GainOrLose(activityLevel,goals){

    let calories;
    let gain;
    if (goals === 'lose')
    calories = activityLevel - 700
    else if (goals === ('maintain'))
    calories = activityLevel;
    else if (goals === 'gain')
    calories = activityLevel + 500
    return calories

}
