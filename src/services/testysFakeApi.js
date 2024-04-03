
const BASE_URL = "http://localhost:8000"

export async function getCategories() {
	const res = await fetch(`${BASE_URL}/categories`)

	if (!res.ok) throw new Error("Something went wrong with categories fetching.")

	const data = await res.json()
	return data
}

export async function getQuestions(category) {
	const res = await fetch(`${BASE_URL}/${category}/`)

	if (!res.ok) throw new Error("Something went wrong with questions fetching.")

	const data = await res.json()
    return data
}

export async function createQuestion(newQuestion, category) {
	try {
		const res = await fetch(`${BASE_URL}/${category}`, {
			method: "POST",
			body: JSON.stringify(newQuestion),
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (!res.ok) throw Error();
        const { data } = await res.json();
        return data
	} catch {
		throw Error('Failed creating your order');
	}
}

export async function deleteQuestion(category, id) {
		const res = await fetch(`${BASE_URL}/${category}/${id}`, {
			method: "DELETE",
		})

		if (!res.ok) throw new Error("Something went wrong with question deleting.")
		// setQuestions((questions) =>
		// 	questions.filter((question) => question.id !== id)
		// )
}
