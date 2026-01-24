const minValue = document.querySelector('#min_value')
const maxValue = document.querySelector('#max_value')

const rangeFill = document.querySelector('.range_fill')
const rangeInputs = document.querySelectorAll('input[type="range"]')

const minRange = rangeInputs[0]
const maxRange = rangeInputs[1]

const maxRangeValue = parseInt(minRange.max)

const validateRange = () => {
    let minPrice = parseInt(minRange.value)
    let maxPrice = parseInt(maxRange.value)

    if (minPrice > maxPrice) {
        [minPrice, maxPrice] = [maxPrice, minPrice]
    }

    minValue.value = minPrice
    maxValue.value = maxPrice

    const left = (minPrice / maxRangeValue) * 100
    const width = ((maxPrice - minPrice) / maxRangeValue) * 100

    rangeFill.style.left = left + '%'
    rangeFill.style.width = width + '%'
}

rangeInputs.forEach(input => {
    input.addEventListener('input', validateRange)
})

validateRange()