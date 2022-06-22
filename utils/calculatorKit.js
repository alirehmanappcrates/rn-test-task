function abbreviateNumber(n = 1) {
    if (n < 1e3) return (n).toFixed(0);
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}

const findMaxValue = async (list) => {
    if (list.length == 0) return 1
    let sortedList = await list.sort((a, b) => b.value - a.value)
    let maxItem = sortedList[0]
    return maxItem.value
}

export {
    abbreviateNumber,
    findMaxValue
}