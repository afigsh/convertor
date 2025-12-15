class Converter {
  constructor() {
    this.leftCurrency = 'RUB';
    this.rightCurrency = 'USD';
    this.rate = 1;
    this.lock = false;

    this.leftInput = document.getElementById('leftAmount');
    this.rightInput = document.getElementById('rightAmount');
    this.leftRate = document.getElementById('leftRate');
    this.rightRate = document.getElementById('rightRate');
    this.error = document.getElementById('errorMessage');

    this.leftButtons = document.querySelectorAll(
      '.converter-panel:first-child .currency-btn'
    );
    this.rightButtons = document.querySelectorAll(
      '.converter-panel:last-child .currency-btn'
    );

    this.bindEvents();
    this.convertFromLeft();
  }

  bindEvents() {
    this.leftButtons.forEach(btn =>
      btn.addEventListener('click', () => {
        this.leftCurrency = btn.dataset.currency;
        this.setActive(this.leftButtons, btn);
        this.convertFromLeft();
      })
    );

    this.rightButtons.forEach(btn =>
      btn.addEventListener('click', () => {
        this.rightCurrency = btn.dataset.currency;
        this.setActive(this.rightButtons, btn);
        this.convertFromLeft();
      })
    );

    this.leftInput.addEventListener('input', () => {
      if (this.lock) return;
      this.convertFromLeft();
    });

    this.rightInput.addEventListener('input', () => {
      if (this.lock) return;
      this.convertFromRight();
    });
  }

  setActive(list, activeBtn) {
    list.forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  parse(value) {
    const v = value.replace(',', '.').replace(/[^0-9.]/g, '');
    return v === '' ? 0 : Number(v);
  }

  format(num) {
    if (!num) return '0';
    const [i, d] = num.toString().split('.');
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (d ? '.' + d : '');
  }

  convertFromLeft() {
    const leftValue = this.parse(this.leftInput.value);
    const result = leftValue * this.rate;

    this.lock = true;
    this.rightInput.value = this.format(result);
    this.updateRates();
    this.lock = false;
  }

  convertFromRight() {
    const rightValue = this.parse(this.rightInput.value);
    const result = rightValue / this.rate;

    this.lock = true;
    this.leftInput.value = this.format(result);
    this.updateRates();
    this.lock = false;
  }

  updateRates() {
    this.leftRate.textContent = `1 ${this.leftCurrency} = ${this.rate.toFixed(
      4
    )} ${this.rightCurrency}`;
    this.rightRate.textContent = `1 ${this.rightCurrency} = ${(1 / this.rate).toFixed(
      4
    )} ${this.leftCurrency}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Converter();
});
