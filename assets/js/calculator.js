function calculate() {
	let price = input.get('auto_price').number().gt(0).val();
	const loanTerm = input.get('loan_term').number().gt(0).val();
	const downPayment = input.get('down_payment').number().gte(0).val();
	const interestRate = input.get('interest_rate').number().gt(0).val();
	const tradeIn = input.get('trade_in_value').number().gte(0).val();
	const tax = input.get('sales_tax').number().gte(0).val();
	const fee = input.get('fees').number().gte(0).val();
	const includeFees = _('include_fees').checked;

	if(!input.valid()) return;

	price = price - tradeIn;
	const saleTax = tax * price / 100;
	const total = includeFees ? price - downPayment + fee + saleTax : price - downPayment;
	const upfrontPayment = !includeFees ? downPayment + fee + Number(saleTax) : downPayment;
	const monthlyPay = total * interestRate / 100 / 12 / (1 - Math.pow((1 + interestRate / 12 / 100), -1 * Number(loanTerm)))
	const totalPayment = monthlyPay * Number(loanTerm);
	const principal = totalPayment - total;
	const totalCost = includeFees ? totalPayment + downPayment + tradeIn : totalPayment + downPayment + tradeIn + saleTax + fee;

	let monthlyResults = [];
	let balance = total;
	let interest = interestRate / 100 / 12;
	let payment = total * interest / (1 - Math.pow((1 + interest), -1 * loanTerm));
	for(let period = 0; period < loanTerm; period++){
		let result = {
			"beginBalance": balance,
			"interest": balance * interest,
			"principal": payment - balance * interest,
		};
		balance = balance - payment + balance * interest;
		balance = balance < 0 ? 0 : balance;
		result.endBalance = balance;
		monthlyResults.push(result);
	}
	const sum = total + principal;
	let monthlyResultsHtml = '';
	monthlyResults.forEach((r, index) => {
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(r.beginBalance)}</td>
			<td>${currencyFormat(r.interest)}</td>
			<td>${currencyFormat(r.principal)}</td>
			<td>${currencyFormat(r.endBalance)}</td>
	</tr>`;
		if((index + 1) % 12 === 0 || (index + 1) === monthlyResults.length) {
			let title = 'Year #{1} End'.replace('{1}', Math.ceil((index + 1) / 12).toString());
			monthlyResultsHtml += `<th class="indigo text-center" colspan="5">${title}</th>`;
		}
	});

	_('amortization').innerHTML = monthlyResultsHtml;
	_('chart_data').innerHTML = `<span>${+(total * 100 / totalPayment).toFixed(1)}</span><span>${+(principal * 100 / totalPayment).toFixed(1)}</span>`;
	updateChartData();

	output.val(currencyFormat(total)).set('result_total_amount');
	output.val(currencyFormat(monthlyPay)).set('result_monthly_payment');
	output.val(currencyFormat(saleTax)).set('result_sales_tax');
	output.val(currencyFormat(upfrontPayment)).set('result_upfront');
	output.val('Total of 60 Loan Payments: $26,845.95').replace('60', loanTerm.toString()).replace('$26,845.95', currencyFormat(totalPayment)).set('result_total_of_loans');
	output.val(currencyFormat(principal)).set('result_total_loan_interest');
	output.val(currencyFormat(totalCost)).set('result_total_cost');
}

function currencyFormat(price){
	return '$' + price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
