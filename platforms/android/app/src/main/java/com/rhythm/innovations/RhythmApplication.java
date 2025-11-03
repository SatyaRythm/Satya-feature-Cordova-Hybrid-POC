/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package com.rhythm.innovations;

import android.app.Application;

/**
 * Application class for the Rhythm Innovations app.
 * This class initializes the application components.
 */
public class RhythmApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize any application-wide components here
        
        // Note: If Salesforce Mobile SDK functionality is needed,
        // you might need to add Salesforce SDK initialization code here
        // or consider using SalesforceSDKManager to initialize the SDK
    }
}