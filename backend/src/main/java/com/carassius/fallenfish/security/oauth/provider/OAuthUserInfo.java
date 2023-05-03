package com.carassius.fallenfish.security.oauth.provider;

import java.util.Map;

public interface OAuthUserInfo {
    String getProvider();

    String getProviderId();

    String getName();

    String getEmail();

    String getProfileImageUrl();

    Map<String, Object> getAttributes();
}
