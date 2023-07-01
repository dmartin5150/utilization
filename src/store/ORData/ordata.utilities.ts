export const minutestohours = (time:number):string  => {
var num = time;
var hours = (time / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
return rhours + " H: " + rminutes + " M";
}