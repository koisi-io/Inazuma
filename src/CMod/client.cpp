#include <node.h>
#include <v8.h>
#include <iostream>
#include <string>
#include "deliv.h"
using std::stringstream;
using std::cin;
using std::cout;
using std::endl;
using namespace v8;
Client client;
/***************************************************************************/
/***************************************************************************/
void clientStart(const FunctionCallbackInfo<Value> &args){
  v8::Isolate *isolate = args.GetIsolate();
  auto message = v8::String::NewFromUtf8(isolate, "Deliv clientStart");
  client.delivInit(8887,"127.0.0.1");
  client.delivReady();
  args.GetReturnValue().Set(message);
}
void clientClose(const FunctionCallbackInfo<Value> &args){
  v8::Isolate *isolate = args.GetIsolate();
  auto message = v8::String::NewFromUtf8(isolate, "Deliv clientClose");
  client.delivClose();
  args.GetReturnValue().Set(message);
}
/***************************************************************************/
/*******************************clientWking*********************************/
void clientWking(const FunctionCallbackInfo<Value> &args){
  v8::Isolate *isolate = args.GetIsolate();
  short buff;int SKID = client.getSKID();
  buff = args[0]->NumberValue();
  switch (buff){
    case 1:send(SKID,"1",4,0);break;
    case 2:send(SKID,"2",4,0);break;
    case 3:send(SKID,"3",4,0);break;
    case 4:send(SKID,"4",4,0);break;
  }
  /*******************************************/
  /*******************************************/
  char recvBf[MaxBuffSize];
  recv(SKID,recvBf,MaxBuffSize,0);
  auto JS_ArrSet = v8::Array::New(isolate);
  stringstream ss;
  ss.str("");ss.clear();
  int a;int b;
  ss << recvBf;
  ss >> a;
  /***     poi poi poi poi poi poi poi poi poi poi     ***/

  if(a == -101){
    /***********************************/
    /***********************************/
    ss >> a;
    if(a == -102){
      auto JS_ArrFoo = v8::Array::New(isolate);
      for(int i=0;true;++i){
        ss >> a;if(a == -102)break;
        ss >> b;
        auto JS_ArrUit = v8::Array::New(isolate);
        JS_ArrUit->Set(0, v8::Integer::New(isolate,a));
        JS_ArrUit->Set(1, v8::Integer::New(isolate,b));
        JS_ArrFoo->Set(i, JS_ArrUit);
      }
      JS_ArrSet->Set(0,JS_ArrFoo);
    }
    /***********************************/
    /***********************************/
    ss >> a;
    if(a == -103){
              /*********************/
      for(int iSNK=1;true;++iSNK){
        auto JS_ArrSnk = v8::Array::New(isolate);
        ss >> a;
        if(a == -103){
          ss >> a;    // get -101
          ss >> a;    // get plyID
          JS_ArrSet->Set(iSNK,v8::Integer::New(isolate,a));
          break;
        };

        if(a == -104){
          for(int i=0;true;++i){
            ss >> a;if(a == -104)break;
            ss >> b;
            auto JS_ArrUit = v8::Array::New(isolate);
            JS_ArrUit->Set(0, v8::Integer::New(isolate,a));
            JS_ArrUit->Set(1, v8::Integer::New(isolate,b));
            JS_ArrSnk->Set(i, JS_ArrUit);
          }
          JS_ArrSet->Set(iSNK,JS_ArrSnk);
        }

      }
              /*********************/
    }
    /***********************************/
    /***********************************/
  }
  /***     poi poi poi poi poi poi poi poi poi poi     ***/
  args.GetReturnValue().Set(JS_ArrSet);
}
/******************************clientWking**********************************/
/***************************************************************************/
void Initialize(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "clientStart", clientStart);
  NODE_SET_METHOD(exports, "clientWking", clientWking);
  NODE_SET_METHOD(exports, "clientClose", clientClose);
}
NODE_MODULE(client, Initialize)
