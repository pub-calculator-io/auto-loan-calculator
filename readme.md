# Auto Loan Calculator WordPress Widget by [Calculator.iO](https://www.calculator.io/ "Calculator.iO Homepage")

This free loan calculator computes the monthly payment and overall cost of an auto loan while taking into consideration sales tax, costs, trade-in value, and other factors.

![Auto Loan Calculator Input Form](/assets/images/screenshot-1.png "Auto Loan Calculator Input Form")
![Auto Loan Calculator Calculation Results](/assets/images/screenshot-2.png "Auto Loan Calculator Calculation Results")

## Installation

1. [Download](https://github.com/pub-calculator-io/age-calculator/archive/refs/heads/master.zip) the ZIP file of this repository.
2. Upload the /auto-loan-calculator-master/ folder to the /wp-content/plugins/ directory.
3. Activate the [Auto Loan Calculator](https://www.calculator.io/auto-loan-calculator/ "Auto Loan Calculator Homepage") plugin through the "Plugins" menu in WordPress.

## Usage
* Add the shortcode `[ci_auto_loan_calculator]` to your page or post and configure default mortgage parameters.
* If you are using widgets, just add the Auto Loan Calculator to the sidebar through the `Appearance -> Widgets -> Auto Loan Calculator` menu in WordPress.
* Add the following code: `<?php display_ci_auto_loan_calculator(); ?>` to your template where you would like the Auto Loan Calculator to appear.

## Libraries in Use
1. https://mathjs.org/
2. https://katex.org/
3. https://github.com/aFarkas/lazysizes
4. https://github.com/RobinHerbots/Inputmask
5. https://air-datepicker.com/
6. https://www.chartjs.org/
