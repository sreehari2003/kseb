package auth

import (
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/supertokens/supertokens-golang/recipe/userroles/userrolesclaims"
)

func createRole() {
	/**
	 * You can choose to give multiple or no permissions when creating a role
	 * createNewRoleOrAddPermissions("user", []string{}) - No permissions
	 * createNewRoleOrAddPermissions("user", []string{"read", "write"}) - Multiple permissions
	 */
	resp, err := userroles.CreateNewRoleOrAddPermissions("user", []string{
		"read",
	}, nil)

	if err != nil {
		// TODO: Handle error
		return
	}
	if resp.OK.CreatedNewRole == false {
		// The role already exists
	}
}

// associate the roles to a user after the session has already been created
// manually associating role to user
func addRolesAndPermissionsToSession(session sessmodels.SessionContainer) error {
	// we add the user's roles to the user's session
	err := session.FetchAndSetClaim(userrolesclaims.UserRoleClaim)
	if err != nil {
		return err
	}

	// we add the user's permissions to the user's session
	err = session.FetchAndSetClaim(userrolesclaims.PermissionClaim)
	if err != nil {
		return err
	}

	return nil
}
