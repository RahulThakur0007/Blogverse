import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    account;    
    database;
    bucket;
    query;
    constructor(){
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
         this.databases = new Databases(this.client); // Corrected: Initialize here
         this.bucket = new Storage(this.client);    
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    
    async updatePost(slug,{title, content, featuredImage, status}){
       try {
           return await this.datatbases.updateDocument(
               conf.appwriteCollectionId,
               conf.appwriteDatabaseId,
               slug,
               {
                   title,
                   content,
                   featuredImage,
                   status,
               }
           )  
       } catch (error) {
              console.log("Appwrite Service :: updatePost :: error", error);
              throw error;
       }
    }
    async deletePost(slug){
        try {
           await this.databases.deleteDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )

            return true;
            
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
        }
    } 
    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            throw error;
        } 
    }
    async getPosts(queries = [Query.equal("status", "active")]){
    
        try {
            return await this.databases.listDocuments(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                queries
            )
            /**await this.databases.listDocuments(
            conf.appwriteDatabaseId,  // Use conf.appwriteDatabaseId
            conf.appwriteCollectionId, // Use conf.appwriteCollectionId
            queries */
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
             return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
        }
    }

    async filePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            // return null;
        } catch (error) {
            console.log("Appwrite Service :: filePreview :: error", error);
            return false
        }
    } 
    
}



const service = new Service();
export default service;