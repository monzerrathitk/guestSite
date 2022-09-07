/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 09-05-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class UploadFilesCtrl {
    @AuraEnabled(cacheable=false)
    public static List<ContentDocumentLink> fetchFiles(String recordId){
        return [SELECT LinkedEntityId, ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType 
                    FROM ContentDocumentLink  
                WHERE LinkedEntityId  =:recordId];
    }
    
    @AuraEnabled(cacheable=false)
    public static void deleteFile(String fileId, String leadId){        
        List<ContentDocumentLink> fileList = [SELECT Id 
                                                FROM ContentDocumentLink 
                                                WHERE Id =: fileId 
                                                    AND LinkedEntityId  =: leadId];
        
        delete fileList;
    }
}
