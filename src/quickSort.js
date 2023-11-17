function swap(arr, n, i) {
    [arr[i], arr[n]] = [arr[n], arr[i]]
}

function getLeft(arr, initValue, lastValue, defaultValue) {
    for(let i = initValue; i <= lastValue; i++) {
        if(arr[i] > arr[lastValue]) return i
    }

    return defaultValue
}

function getRight(arr, initValue, lastValue, defaultValue) {
    for(let i = initValue; i >= lastValue; i--) {
        if(arr[i] < arr[initValue]) return i
    }

    return defaultValue
}

function partition(arr, start, end) {
    const l = getLeft(arr, start, end, end)
    const r = getRight(arr, end, start, start)

    if(l < r) {
        swap(arr, l, r)
        return partition(arr, start, end)
    }
    
    swap(arr, l, end)
    return l
}

function quickSort(arr, start=0, end=arr.length-1) {
    if(start < end) {
        const index = partition(arr, start, end)

        quickSort(arr, start, index - 1)
        quickSort(arr, index + 1, end)
    }
}

function partitionTwoArr(arr1, arr2, start, end) {
    const l = getLeft(arr2, start, end, end)
    const r = getRight(arr2, end, start, start)

    if(l < r) {
        swap(arr1, l, r)
        swap(arr2, l, r)
        return partitionTwoArr(arr1, arr2, start, end)
    }
    
    swap(arr1, l, end)
    swap(arr2, l, end)
    return l
}

function quickSortTwoArr(arr1, arr2, start=0, end=arr1.length-1) {
    if(start < end) {
        const index = partitionTwoArr(arr1, arr2, start, end)

        quickSortTwoArr(arr1, arr2, start, index - 1)
        quickSortTwoArr(arr1, arr2, index + 1, end)
    }
}

export { quickSortTwoArr }
export default quickSort