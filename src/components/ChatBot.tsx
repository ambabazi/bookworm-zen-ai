import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your book store assistant. I can help you find books, check availability, and answer any questions you have about our collection. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", userMessage.text);
      formData.append("timestamp", userMessage.timestamp.toISOString());
      formData.append("sessionId", `session_${Date.now()}`);
      formData.append("context", "bookstore_customer_chat");

      const response = await fetch("https://ambabazi00.app.n8n.cloud/webhook/chatapp", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();
      
      // Parse the response - handle both direct text and JSON structured responses
      let responseText = "";
      
      if (typeof data === 'string') {
        responseText = data;
      } else if (data.output) {
        responseText = data.output;
      } else if (data.response) {
        responseText = data.response;
      } else if (data.message) {
        responseText = data.message;
      } else if (data.text) {
        responseText = data.text;
      } else {
        // If it's a JSON object with subject/body (email format), extract conversational content
        try {
          if (typeof data === 'object' && (data.subject || data.body)) {
            responseText = "I'm here to help you with book recommendations and store information! What can I assist you with today?";
          } else {
            responseText = "I'm sorry, I couldn't process that request. Please try again.";
          }
        } catch {
          responseText = "I'm here to help! How can I assist you with finding the perfect book today?";
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error("Chatbot error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties right now. Please try again in a moment or contact our support team directly.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to the chat service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow bg-accent hover:bg-accent/90 text-accent-foreground z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-elegant z-50 bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-accent rounded-t-lg">
        <CardTitle className="text-sm font-semibold text-accent-foreground flex items-center gap-2">
          <Bot className="h-4 w-4" />
          Book Store Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Online
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 text-accent-foreground hover:bg-accent-foreground/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-[400px] p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex-shrink-0 w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-sage-foreground" />
                </div>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-sage-foreground" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about books, availability, recommendations..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              size="icon"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
