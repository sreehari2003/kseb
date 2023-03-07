package auth

import (
	"os"

	"github.com/supertokens/supertokens-golang/recipe/passwordless"
	"github.com/supertokens/supertokens-golang/recipe/passwordless/plessmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func Init() {
	SUPERTOKENS_URI := os.Getenv("SUPERTOKENS_URI")
	SUPERTOKENS_API_KEY := os.Getenv("SUPERTOKENS_API_KEY")
	apiBasePath := "/auth"
	websiteBasePath := "/auth"
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: SUPERTOKENS_URI,
			APIKey:        SUPERTOKENS_API_KEY,
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "kseb",
			APIDomain:       "http://localhost:8080",
			WebsiteDomain:   "http://localhost:3000",
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			passwordless.Init(plessmodels.TypeInput{
				FlowType: "USER_INPUT_CODE",
				ContactMethodPhone: plessmodels.ContactMethodPhoneConfig{
					Enabled: true,
				},
			}),
			session.Init(nil),   // initializes session features
			userroles.Init(nil), // initialize user roles
		},
	})

	if err != nil {
		panic(err.Error())
	}
}
