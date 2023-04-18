import { useEffect, useState } from "react";

function DeleteProperty(props) {

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/properties/property-delete/' + props.pid + '/', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
/*             body: JSON.stringify(commentStuff) */
        })
        .then(response => console.log(response))
        // .then(() => console.log("it submitted"))

        window.location.reload();
    }


    return (
        <div>

            <div class="modal fade" id="delete-property-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete Property</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body justify-content-between">
                            <div class="mb-3">
                                Are you sure you want to delete this property?
                            </div>
                            <form class="pb-2" onSubmit={handleSubmit}>
                                <button class="btn btn-danger" type="submit">Confirm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default DeleteProperty;