import { useEffect, useState } from 'react';

/**
 * 외부 JavaScript 소스 주소를 받아, 동적으로 script HTML태그를 만들어 적용.
 * @param {string} src 외부 js 소스 주소
 * @returns js 로드 결과 출력 ( l, r, e )
 */
function useLoadScript(src: string): string {
  // status - 현재 파라미터 값으로 입력받은 외부 Js 주소의 상태를 저장
  const [status, setStatus] = useState<string>(src ? 'loading' : 'idle');

  // useEffect - 의존성 배열 내용인 src가 변경될 때 마다 작동
  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    // script - script태그 중 src 속성에 파라미터로 받은 src값이 저장된 태그이며 typescript에 의해 HTMLScriptElement 또는 null값을 가질 수 있음
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';

      // async사용 이유는 스크립트를 읽는 도중 DOM생성을 멈추기 때문에 async를 사용한다면 스크립트를 불러오면서 DOM렌더링을 동시에 처리 함
      // async와 비슷한 기능을 하는 옵션은 defer이며 async는 script를 다운받으면 순서에 상관없이 다운된 파일을 우선적으로 실행하여 js파일이 우선순위가
      // 있다면 문제가 생긴다. 반면, defer는 script들을 다 다운 받은 이후 실행하므로 순서가 필요한 js에 대해서 문제가 생기지 않음.
      // 해당 customhook의 경우는 동적으로 한개씩 추가 하는 것 이므로 js파일 로딩에 우선순위가 없으므로 async를 사용함
      script.async = true;

      // 동적으로 만든 script 태그에 data-status라는 이름의 속성을 만들고 값은 loading을 부여
      script.setAttribute('data-status', 'loading');

      // body에 만든 script 태그를 붙임
      document.body.appendChild(script);

      // 속성 변경하는 Event handler
      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
      };
      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      // script태그가 존재하고 태그 속성중 data-status의 값이 null이면 error를 속성으로 부여함
      setStatus(script.getAttribute('data-status') ?? 'error');
    }

    // useState 변경하는 handler
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };
    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    // eslint-disable-next-line consistent-return
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src]);

  return status;
}

export default useLoadScript;
