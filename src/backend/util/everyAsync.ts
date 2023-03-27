const areAllTrue = async (promises: Promise<boolean>[]) => {
    const results = await Promise.all(promises)
    return results.every(x => x === true)
}

export default areAllTrue
