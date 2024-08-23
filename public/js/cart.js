document.querySelector('.checkout').addEventListener('click', () => {
    fetch('/stripe-checkout', {
        method: "post",
        headers: new Headers({"Content-Type": "application/Json"}),
        body: JSON.stringify(
            {
                items: JSON.parse(localStorage.getItem("cartStorage"))
            }
        ),
    })
    .then((res) => res.json())
    .then((url) => {
        location.href = url
    })
    .catch((err) => console.log(err))
    })