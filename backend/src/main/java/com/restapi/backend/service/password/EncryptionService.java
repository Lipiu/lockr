package com.restapi.backend.service.password;

import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.restapi.backend.constants.Constants;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EncryptionService {
    private final SecretKeySpec key;
    private final SecureRandom secureRandom = new SecureRandom();
    
    public EncryptionService(@Value("${app.encryption.key}") String base64key) {
        byte[] keyBytes = Base64.getDecoder().decode(base64key);
        if(keyBytes.length != Constants.KEY_BYTES_VAULT) {
            throw new IllegalStateException("Encryption key must be 32 bytes");
        }
        this.key = new SecretKeySpec(keyBytes, "AES");
    }

    public String encrypt(String plainText){
        try {
            byte[]initVector = new byte[Constants.GCM_IV_BYTES];
            secureRandom.nextBytes(initVector);

            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(Constants.GCM_TAG_BITS,initVector));
            
            byte[] cipherText = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
            byte[] combined = new byte[initVector.length + cipherText.length];

            System.arraycopy(initVector, 0, combined, 0,initVector.length);
            System.arraycopy(cipherText, 0, combined,initVector.length, cipherText.length);

            return Base64.getEncoder().encodeToString(combined);
        }
        catch (GeneralSecurityException gse){
            throw new IllegalStateException("Encryption failed: ", gse);
        }
    }

    public String decrypt(String stored){
        byte[] decoded = Base64.getDecoder().decode(stored);
        if(decoded.length < Constants.GCM_IV_BYTES + Constants.GCM_TAG_BYTES){
            throw new IllegalArgumentException("Invalid encrypted data");
        }

        try {
            byte[] initVector = Arrays.copyOfRange(decoded, 0, Constants.GCM_IV_BYTES);
            byte[] cipherText = Arrays.copyOfRange(decoded, Constants.GCM_IV_BYTES, decoded.length);
            
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(Constants.GCM_TAG_BITS, initVector));

            return new String(cipher.doFinal(cipherText), StandardCharsets.UTF_8);
        }
        catch(GeneralSecurityException gse){
            throw new IllegalStateException("Decryption failed: ", gse);
        }
    }
    
}