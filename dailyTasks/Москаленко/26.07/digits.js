function digitToString(digit) {
	var digit = digit;
	
	var result, one, ten, tenAndOne, hundreds;
	var digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
	var digitsTen = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
	var hundred = " hundred ";
	
	if(digit <= 20 && digit >= 0) result = digits[digit];
	
	if(digit > 20 && digit < 100) result = (digitsTen[Math.floor(digit / 10)-1] + " " + digits[digit % 10]);
	if(digit > 20 && digit < 100 && digit % 10 === 0) result = (digitsTen[Math.floor(digit / 10)-1]);
	
	if(digit >= 100 && digit < 1000) {
		hundreds = Math.floor(digit / 100);
		ten = Math.floor(digit / 10) % 10;
		tenAndOne = digit % 100;
		one = digit % 10;
	};
	
	if(hundreds > 1) hundred = " hundreds ";
		else hundred = " hundred ";
	
	if(digit >= 100 && digit < 1000 && tenAndOne === 0)
		result = (digits[hundreds] + hundred);
	else if(digit > 120 && digit < 1000 && ten === 0)
		result = (digits[hundreds] + hundred + digits[one]);
	else if(digit > 120 && digit < 1000 && one === 0)
		result = (digits[hundreds] + hundred + digitsTen[ten-1]);
	else if (digit > 100 && digit < 1000 && tenAndOne >= 0 && tenAndOne <= 20) 
		result = (digits[hundreds] + hundred + digits[tenAndOne]);
	else if(digit > 120 && digit < 1000)
		result = (digits[hundreds] + hundred + digitsTen[ten-1] + " " + digits[one]);
	
	return(result);
};