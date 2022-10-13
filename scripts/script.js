const formatCurrency = n => new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 2,
  }).format(n);


{const navigationLinks = document.querySelectorAll(".navigation__link");
const calcElems = document.querySelectorAll(".calc");


for (let i = 0;  i < navigationLinks.length; i += 1) {
  navigationLinks[i].addEventListener('click', (e) => {
    e.preventDefault();
    for (let j = 0;  j < navigationLinks.length; j += 1) {
      if(navigationLinks[i].dataset.tax === calcElems[j].dataset.tax) {
        calcElems[j].classList.add('calc_active');
        navigationLinks[i].classList.add('navigation__link_active');
      } else {
        calcElems[j].classList.remove('calc_active');
        navigationLinks[j].classList.remove('navigation__link_active');
      }
      
    }
  }) 
}
}
// Ausn

{const ausn = document.querySelector(".ausn");
const formAusn = ausn.querySelector(".calc__form");
const resultTaxTotal = document.querySelector(".result__tax-total");
const calcLabelExpenses = ausn.querySelector(".calc__label_expenses");


calcLabelExpenses.style.display = 'none';

formAusn.addEventListener('input', () => {
  console.log(formAusn.income.value);
  if(formAusn.type.value ==='income') {
    calcLabelExpenses.style.display = 'none';
    resultTaxTotal.textContent = formatCurrency(formAusn.income.value * 0.08);
    formAusn.expenses.value = 0
  }
  if(formAusn.type.value ==='expenses') {
    calcLabelExpenses.style.display = 'block';
    resultTaxTotal.textContent = formatCurrency((formAusn.income.value - formAusn
      .expenses.value) * 0.2);
  }
  
})
}
// Самозанятый
{const selfEmployment = document.querySelector(".self-employment");
const formSelfEmployment = selfEmployment.querySelector(".calc__form");
const resultTaxSelfEmployment = selfEmployment.querySelector(".result__tax");
const calcCompensation = selfEmployment.querySelector(".calc__label_compensation");
const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block_compensation');
const resultTaxCompensation = selfEmployment.querySelector('.result__tax_compensation');       
const resultTaxRestCompensation = selfEmployment.querySelector('.result__tax_rest-compensation');
const resultTaxResult = selfEmployment.querySelector('.result__tax_result');


const checkCompensation = (value) => {
  const setDisplay = formSelfEmployment.addCompensation.checked ? 'block' : 'none';
  calcCompensation.style.display = setDisplay;

  resultBlockCompensation.forEach((elem) => {
    elem.style.display = setDisplay;
  })
};

checkCompensation()

formSelfEmployment.addEventListener('input',  () => {
  const resIndividual = formSelfEmployment.individual.value * 0.04;
  const resEntity = formSelfEmployment.entity.value * 0.06;

  checkCompensation();

const tax = resIndividual + resEntity;
formSelfEmployment.compensation.value = 
  formSelfEmployment.compensation.value > 10000
  ? 10000
  : formSelfEmployment.compensation.value;
const benefit = formSelfEmployment.compensation.value;
const resBenefit = formSelfEmployment.individual.value * 0.01 +
formSelfEmployment.entity.value * 0.02;
const finalBenefit = benefit - resBenefit > 0 ? benefit - resBenefit : 0;
const finalTax = tax - (benefit - finalBenefit);

resultTaxSelfEmployment.textContent = formatCurrency(tax);
resultTaxCompensation.textContent = formatCurrency(benefit - finalBenefit);
resultTaxRestCompensation.textContent = formatCurrency(finalBenefit);
resultTaxResult.textContent = formatCurrency(finalTax);

});
}

//OCHO
{const osno = document.querySelector('.osno');
const formOsno = osno.querySelector('.calc__form');

const ndflExpenses  = osno.querySelector('.result__block_ndfl-expenses');
const ndflIncome  = osno.querySelector('.result__block_ndfl-income');
const  profit = osno.querySelector('.result__block_profit');

const resultTaxNds = osno.querySelector('.result__tax_nds');
const resultTaxProperty = osno.querySelector ('.result__tax_property');
const resultTaxNdflExpenses = osno.querySelector('.result__tax_ndfl-expenses');
const resultTaxNdflIncome = osno.querySelector('.result__tax_ndfl-income');
const resultTaxProfit = osno.querySelector('.result__tax_profit');



const checkFormBusiness = () => {
  if(formOsno.formBusiness.value === 'ИП') {
    ndflExpenses.style.display = '';
    ndflIncome.style.display = '';
    profit.style.display = 'none';
  }
  if(formOsno.formBusiness.value === 'OOO') {
    ndflExpenses.style.display = 'none';
    ndflIncome.style.display = 'none';
    profit.style.display = '';
  }
};
checkFormBusiness();

formOsno.addEventListener('input', () => {
  checkFormBusiness();
  const income = formOsno.income.value;
  const expenses = formOsno.expenses.value;  
  const property = formOsno.property.value;

  const nds = income * 0.2;
  const taxProperty = property* 0.02;
  const profit = income - expenses;
  const ndflExpensesTotal = profit * 0.13;
  const ndflIncomeTotal = (income - nds) * 0.13;
  const taxProfit = profit * 0.2;

  resultTaxNds.textContent = nds;
  resultTaxProperty.textContent = taxProperty;
  resultTaxNdflExpenses.textContent = ndflExpensesTotal;
  resultTaxNdflIncome.textContent = ndflIncomeTotal
  resultTaxProfit.textContent = taxProfit 
});
}
//YSN
const LIMIT = 3000000;
{const usn = document.querySelector('.usn');
const formUsn = usn.querySelector('.calc__form');

const calcLabelExpenses = usn.querySelector('.calc__label_expenses');
const calcLabelProperty = usn.querySelector('.calc__label_property');
const resultBlockProperty = usn.querySelector('.result__block_property');

const resultTaxTotal = usn.querySelector('.result__tax_total');
const resultTaxProperty = usn.querySelector('.result__tax_property');

const checkShopProperty = (typeTax) => {
  switch(typeTax) {

    case 'income': {
      calcLabelExpenses.style.display = 'none'
      calcLabelProperty.style.display = 'none'
      resultBlockProperty.style.display = 'none'

      formUsn.expenses.value = '';
      formUsn.property.value = '';
      break;
    }

    case 'ip-expenses': {
      calcLabelExpenses.style.display = '';
      calcLabelProperty.style.display = 'none';
      resultBlockProperty.style.display = 'none';

      formUsn.property.value = '';
      break;
    }

    case 'ooo-expenses': {
      calcLabelExpenses.style.display = '';
      calcLabelProperty.style.display = '';
      resultBlockProperty.style.display = '';

      break;
    };
   }
 }
// const typeTax = {
//   'income': () => {
//     calcLabelExpenses.style.display = 'none';
//       calcLabelProperty.style.display = 'none';
//       resultBlockProperty.style.display = 'none';

//       formUsn.expenses.value = '';
//       formUsn.property.value = '';
//   },
//   'ip-expenses': () => {
//       calcLabelExpenses.style.display = '';
//       calcLabelProperty.style.display = 'none';
//       resultBlockProperty.style.display = 'none';

//       formUsn.property.value = '';
//   },
//   'ooo-expenses': () => {
//       calcLabelExpenses.style.display = '';
//       calcLabelProperty.style.display = '';
//       resultBlockProperty.style.display = '';
//   },
// }

const percent = {
  'income': 0.06,
  'ip-expenses': 0.15,
  'ooo-expenses': 0.15,
}
checkShopProperty(formUsn.typeTax.value);

// typeTax[formUsn.typeTax.value]();

formUsn.addEventListener('input', () => {
  checkShopProperty(formUsn.typeTax.value);
  // typeTax[formUsn.typeTax.value]();

  const income = formUsn.income.value;
  const expenses = formUsn.expenses.value;
  const contributions = formUsn.contributions.value;
  const property = formUsn.property.value;

  let profit = income - contributions;

  if(formUsn.typeTax.value !== 'income') {
    profit -= expenses;
  }

  const taxBigIncome = income > LIMIT ? (profit - LIMIT) * 0.01 : 0;
  const summ = profit - (taxBigIncome < 0 ? 0 : taxBigIncome);
  const tax = summ * percent[formUsn.typeTax.value];
  const taxProperty = property * 0.02;

  resultTaxTotal.textContent = foormatCurrency(tax);
  resultTaxProperty.textContent = foormatCurrency(taxProperty);
});

}




