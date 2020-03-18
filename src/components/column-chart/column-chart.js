import './column-chart.css';

export default class ColumnChart {
  constructor(data, options = {}) {
    this._data = data;
    this._options = options;
    return this._render();
  }

  _getLink() {
    const { link } = this._options;

    return link
      ? `<a href="${link}" class="column-chart__link">View all</a>`
      : '';
  }

  _getColumnBody() {
    return this._data
      .map(({ value }) => `<div style="--value:${value}" data-tooltip="${value}%"></div>`)
      .join('');
  }

  _render() {
    this._element = document.createElement('div');
    this._element.classList.add(
      'column-char', `dashboard__chart_${this._options.label}`
    );
    this._element.innerHTML = `
      <div class="column-chart__title">
        Total ${this._options.label}
        ${this._getLink()}
      </div>
      <div class="column-chart__container">
        <div class="column-chart__header">${this._options.value}</div>
        <div class="column-chart__chart">
          ${this._getColumnBody()}
        </div>
      </div>
    `;

    return this._element;
  }
}