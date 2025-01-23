
const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
export const bloodGroupOptions = bloodGroup.map(item => ({
    value: item,
    label: item
}))

const gender = ['male', 'female', 'other'];
export const genderOptions = gender.map(item => ({
    value: item,
    label: item
}))