require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('Error: API_KEY environment variable not found. Please ensure .env file exists and contains API_KEY');
  process.exit(1);
}

app.post('/completions', async (req, res) => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AI_server.jsx:17',message:'POST /completions received',data:{messageLength:req.body?.message?.length,hasMessage:!!req.body?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 1000,
            temperature: 0
        })
    };
    try {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AI_server.jsx:32',message:'Before OpenAI API call',data:{hasApiKey:!!API_KEY},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AI_server.jsx:33',message:'OpenAI API response status',data:{status:response.status,statusText:response.statusText,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        const data = await response.json();
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AI_server.jsx:34',message:'OpenAI API response data structure',data:{hasData:!!data,hasChoices:!!data?.choices,choicesLength:data?.choices?.length,hasMessage:!!data?.choices?.[0]?.message,hasContent:!!data?.choices?.[0]?.message?.content,contentLength:data?.choices?.[0]?.message?.content?.length,error:data?.error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        // Check if OpenAI API returned an error
        if (!response.ok || data.error || !data.choices || !data.choices[0]) {
            // #region agent log
            fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AI_server.jsx:40',message:'OpenAI API error detected',data:{status:response.status,error:data?.error?.message,hasChoices:!!data?.choices},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'Q'})}).catch(()=>{});
            // #endregion
            return res.status(response.status || 500).json({
                error: data.error?.message || 'OpenAI API request failed',
                details: data.error || 'Unknown error'
            });
        }
        res.send(data);
    } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/90fd9d89-a492-43ea-997f-ccfab706df65',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AI_server.jsx:38',message:'Error in /completions endpoint',data:{errorMessage:error?.message,errorStack:error?.stack?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        console.log(error);
        res.send(error);
    }
});

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));

