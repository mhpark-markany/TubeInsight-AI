# TubeInsight AI 🎥

**TubeInsight AI**는 Google의 최신 **Gemini 2.0** 모델을 활용하여 유튜브 동영상을 심층 분석하고 요약해주는 지능형 웹 애플리케이션입니다.

단순히 영상을 요약하는 것을 넘어, 크리에이터의 채널 전략, 성과 비교, 시청자 반응(Sentiment) 분석 등 깊이 있는 인사이트를 제공하여 시간을 절약하고 효율적으로 정보를 습득할 수 있도록 돕습니다.

![TubeInsight AI Preview](https://via.placeholder.com/800x400?text=TubeInsight+AI+Preview)

## ✨ 주요 기능

*   **📹 동영상 심층 요약**: 사용자가 원하는 길이(짧게, 중간, 길게)에 맞춰 영상의 핵심 내용을 요약합니다.
*   **📊 채널 분석 및 전략**: 채널의 콘텐츠 전략, 성공 요인, 주력 주제를 AI가 분석하여 제공합니다.
*   **📈 성과 비교 시각화**: 현재 영상과 해당 채널의 다른 인기 영상들의 조회수 성과를 직관적인 차트로 비교합니다.
*   **⏱️ 주요 장면 (타임라인)**: 영상의 핵심 순간을 시간대별로 추출하여 빠르게 탐색할 수 있습니다.
*   **🌐 Google Search Grounding**: 실시간 Google 검색을 통해 정확한 조회수, 게시일, 최신 정보를 검증 및 제공합니다.
*   **🇰🇷 완벽한 한글 지원**: 한국어와 영어를 지원하며, 결과물 또한 선택한 언어로 자연스럽게 번역되어 제공됩니다.
*   **💾 검색 기록 관리**: 최근 분석한 영상 목록을 로컬에 저장하여 언제든 다시 확인할 수 있습니다.

## 🛠️ 기술 스택

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google Gemini API (`@google/genai` SDK - `gemini-3-flash-preview`)
*   **Data Visualization**: Recharts
*   **Icons**: Lucide React
*   **Tooling**: Vite (Recommended) or Webpack

## 🚀 시작하기

이 프로젝트를 로컬 환경에서 실행하기 위한 방법입니다.

### 필수 조건

*   Node.js (v18 이상 권장)
*   NPM 또는 Yarn
*   [Google AI Studio](https://aistudio.google.com/)에서 발급받은 유효한 **API KEY**

### 설치 및 실행

1.  **저장소 복제 (Clone)**
    ```bash
    git clone https://github.com/your-username/tubeinsight-ai.git
    cd tubeinsight-ai
    ```

2.  **패키지 설치**
    ```bash
    npm install
    # 또는
    yarn install
    ```

3.  **환경 변수 설정**
    프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 API 키를 설정합니다. (또는 실행 환경에 맞게 설정)
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **애플리케이션 실행**
    ```bash
    npm start
    # 또는
    npm run dev
    ```

## 📝 사용 방법

1.  **URL 입력**: 분석하고 싶은 유튜브 동영상의 링크를 상단 검색창에 입력합니다.
2.  **옵션 선택**:
    *   **요약 길이**: 짧게 / 중간 / 길게 중 선택
    *   **언어**: 한국어 / English 선택
3.  **분석 시작**: '요약하기' 버튼을 클릭합니다.
4.  **결과 확인**:
    *   AI가 생성한 요약문과 주요 키워드를 확인합니다.
    *   타임스탬프를 통해 주요 구간을 확인합니다.
    *   채널 분석 차트를 통해 영상의 성과를 비교 분석합니다.

## 📂 프로젝트 구조

```
/
├── components/         # UI 컴포넌트
│   ├── SearchBar.tsx       # 검색 및 옵션 설정
│   ├── VideoSummary.tsx    # 요약 및 메타데이터 표시
│   ├── ChannelAnalysis.tsx # 차트 및 채널 분석
│   ├── HistoryList.tsx     # 검색 기록 목록
│   └── SkeletonLoader.tsx  # 로딩 UI
├── services/           # 비즈니스 로직
│   ├── geminiService.ts    # Google GenAI API 연동
│   └── historyService.ts   # LocalStorage 관리
├── types.ts            # TypeScript 인터페이스 정의
├── App.tsx             # 메인 애플리케이션
└── index.tsx           # 진입점
```

## ⚠️ 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다.
