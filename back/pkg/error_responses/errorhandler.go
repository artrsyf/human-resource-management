package errorresponses

import (
	"back/pkg/logger"
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"
)

func JSONError(w http.ResponseWriter, status int, msg string, method string) {
	defer func() {
		if r := recover(); r != nil {
			logger.Logger.WithFields(logrus.Fields{
				"method": method,
				"status": status,
				"panic":  r,
			}).Error("panic occurred")
		}
	}()

	logger.Logger.WithFields(logrus.Fields{
		"method": method,
		"status": status,
	}).Error(msg)

	w.WriteHeader(status)

	resp, err := json.Marshal(map[string]interface{}{
		"status": status,
		"error":  msg,
	})
	if err != nil {
		return
	}

	_, err = w.Write(resp)
	if err != nil {
		return
	}
}
