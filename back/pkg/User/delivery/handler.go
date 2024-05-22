package delivery

import (
	"back/pkg/User/repository"
	errorresponses "back/pkg/error_responses"
	"encoding/json"
	"net/http"
)

type UserHandler struct {
	UserRepo repository.UserRepo
}

func (h *UserHandler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.UserRepo.GetUsersFromRepo()
	if err != nil {
		errorresponses.JSONError(w, http.StatusForbidden, err.Error(), "UserRepo.GetUsersFromRepo")
	}

	jsonUsers, err := json.Marshal(users)
	if err != nil {
		errorresponses.JSONError(w, http.StatusInternalServerError, err.Error(), "UserHandler.GetAllUsers")
	}

	_, err = w.Write(jsonUsers)
	if err != nil {
		errorresponses.JSONError(w, http.StatusInternalServerError, "Internal error", "UserHandler.GetAllUsers")
	}
}
