import { COMMAND } from "./const";

export const PUNCTUATION_REGEXP = new RegExp('[,?!]');
export const COMMAND_WITH_NUMBER_REGEXP = new RegExp(`(${COMMAND}([^\sa-zA-Z]*))`, 'gis');